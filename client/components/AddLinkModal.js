import axi from "config/axios";
import {
  Box,
  Button,
  Flex,
  Layer,
  Modal,
  Spinner,
  TextField,
  Toast,
} from "gestalt";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "react-query";

export default function AddLinkModal({ onDismiss, onSuccess }) {
  const state = {
    title: null,
    url: null,
    category: null,
  };

  const [link, setLink] = useState({
    title: "",
    url: "",
    category: "",
  });

  const handleChange = (name, val) => {
    setLink({
      ...link,
      [name]: val,
    });
  };

  const mutation = useMutation((data) => axi.post("/link/create", link));

  useEffect(() => {
    if (mutation.isSuccess) {
      setLink({
        title: "",
        url: "",
        category: "",
      });
      toast.success("Succes, the link is shared")
      onSuccess()
    }
  }, [mutation.isSuccess]);

  return (
    <Layer>
      <Modal
        accessibilityModalLabel="Create new board"
        heading="Add link"
        onDismiss={onDismiss}
        footer={
          <Flex alignItems="center" justifyContent="between">
            <Button
              inline
              color="gray"
              text="Cancel"
              type="button"
              onClick={onDismiss}
            />
            {mutation.isLoading ? (
              <Spinner show={true} size="sm" />
            ) : (
              <Button
                inline
                color="blue"
                text="Create"
                onClick={() => mutation.mutate(link)}
              />
            )}
          </Flex>
        }
        size="sm"
      >
        <Box paddingX={8}>
          <Box marginBottom={8}>
            <TextField
              id="title"
              onChange={({ value }) => handleChange("title", value)}
              placeholder="what is the link is talking about"
              label="title"
              value={link.title}
              type="text"
            />
          </Box>
          <Box marginBottom={8}>
            <TextField
              id="url"
              onChange={({ value }) => handleChange("url", value)}
              value={link.url}
              placeholder="url"
              label="url"
              type="text"
            />
          </Box>
          <Box marginBottom={8}>
            <TextField
              id="cat"
              onChange={({ value }) => handleChange("category", value)}
              placeholder="category"
              value={link.category}
              label="category"
              helperText="seprated by comma, e.g: Go, Javascript, Test"
              type="text"
            />
          </Box>
        </Box>
      </Modal>
    </Layer>
  );
}
