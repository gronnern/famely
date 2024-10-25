"use client";
import { useState } from "react";
import { Spacer } from "@nextui-org/spacer";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { DeleteIcon } from "@nextui-org/shared-icons";
import { useEffect } from "react";
import { Spinner } from "@nextui-org/spinner";

import { title } from "@/app/ui/primitives";
import { createClient } from "@/app/lib/supabase/client";

interface ListItem {
  id: number;
  title: string;
  items: string[];
}
export default function Lists() {
  const supabase = createClient();

  const [lists, setLists] = useState<ListItem[]>([]);
  const [newListTitle, setNewListTitle] = useState("");
  const [selectedListIndex, setSelectedListIndex] = useState<number | null>(
    null,
  );
  const [newItem, setNewItem] = useState("");
  const [open, setOpen] = useState(false);
  const [loadingLists, setLoadingLists] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      const user = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("lists")
        .select()
        .eq("user_id", user.data.user?.id);

      if (error) {
        console.error("Error fetching lists:", error);
      } else {
        setLists(data);
      }
    };

    fetchLists();
    setLoadingLists(false);
  }, []);

  const handleAddList = async () => {
    if (newListTitle.trim()) {
      const newList = { title: newListTitle.trim(), items: [] };

      const user = await supabase.auth.getUser();
      const { error, data } = await supabase
        .from("lists")
        .insert([{ ...newList, user_id: user.data.user?.id }])
        .select();

      if (error) {
        console.error("Error adding list:", error);
      } else {
        setLists([...lists, data[0]]);
        setNewListTitle("");
      }
    }
  };

  const handleDeleteList = async (listIndex: number) => {
    const listToDelete = lists[listIndex];

    const { error } = await supabase
      .from("lists")
      .delete()
      .eq("id", listToDelete.id);

    if (error) {
      console.error("Error deleting list:", error);
    } else {
      const updatedLists = lists.filter((_, index) => index !== listIndex);

      setLists(updatedLists);
    }
  };

  const handleAddItem = async () => {
    if (newItem.trim() && selectedListIndex !== null) {
      const updatedLists = [...lists];

      updatedLists[selectedListIndex].items.push(newItem.trim());

      const { error } = await supabase
        .from("lists")
        .update({ items: updatedLists[selectedListIndex].items })
        .eq("id", updatedLists[selectedListIndex].id);

      if (error) {
        console.error("Error adding item:", error);
      } else {
        setLists(updatedLists);
        setNewItem("");
        setOpen(false);
      }
    }
  };

  const handleDeleteItem = async (listIndex: number, itemIndex: number) => {
    const updatedLists = [...lists];

    updatedLists[listIndex].items.splice(itemIndex, 1);

    const { error } = await supabase
      .from("lists")
      .update({ items: updatedLists[listIndex].items })
      .eq("id", updatedLists[listIndex].id);

    if (error) {
      console.error("Error deleting item:", error);
    } else {
      setLists(updatedLists);
    }
  };

  const handleOpenDialog = (index: number) => {
    setSelectedListIndex(index);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setNewItem("");
  };

  return (
    <div className="flex-1 flex flex-col min-w-72">
      <h1 className={title()}>Lists</h1>
      <Spacer y={4} />
      <Input
        required
        label="New list title"
        value={newListTitle}
        onChange={(e) => setNewListTitle(e.target.value)}
      />
      <Spacer y={4} />
      <Button color="primary" onClick={handleAddList}>
        New list
      </Button>
      <Spacer y={4} />
      {loadingLists && <Spinner />}
      <div className="gap-2 grid">
        {lists.map((list, index) => (
          <Card key={index}>
            <CardHeader>
              <h4>{list.title}</h4>
            </CardHeader>
            <CardBody>
              {list.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex justify-between mb-4">
                  <p>{item}</p>
                  <Button
                    isIconOnly
                    color="danger"
                    variant="flat"
                    onClick={() => handleDeleteItem(index, itemIndex)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              ))}
            </CardBody>
            <CardFooter>
              <div className="flex-1">
                <Button
                  className="mr-2"
                  color="primary"
                  variant="flat"
                  onPress={() => handleOpenDialog(index)}
                >
                  Add item
                </Button>
                <Button
                  color="danger"
                  variant="flat"
                  onPress={() => handleDeleteList(index)}
                >
                  Delete list
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Modal isOpen={open} size="xs" onClose={handleCloseDialog}>
        <ModalContent>
          <ModalHeader>
            <h4>Add New Item</h4>
          </ModalHeader>
          <ModalBody>
            <Input
              label="New item"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" variant="flat" onClick={handleAddItem}>
              Add
            </Button>
            <Button color="danger" variant="flat" onClick={handleCloseDialog}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
