"use client";

import { useState, useEffect } from "react";
// import background from "assetsDALL·E 2024-08-11 21.41.23 - A retro-style background featuring soft pastel colors, subtle geometric shapes, and a grainy texture that evokes a 1980s or early 1990s aesthetic. The.webp"; // Adjust this path according to your directory structure
import "@fontsource/press-start-2p";
import {
  Box,
  Stack,
  Typography,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { firestore } from "@/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: 3,
};

export default function Home() {
  // We'll add our component logic here
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState("");
  const updateInventory = async () => {
    const snapshot = query(collection(firestore, "inventory"));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({ name: doc.id, ...doc.data() });
    });
    setInventory(inventoryList);
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      await setDoc(docRef, { quantity: quantity + 1 });
    } else {
      await setDoc(docRef, { quantity: 1 });
    }
    await updateInventory();
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, "inventory"), item);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }
    await updateInventory();
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 3,
        padding: 4,
        // backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        fontFamily: "'Press Start 2P', sans-serif",
      }}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{ ...style, padding: 4, borderRadius: 2, boxShadow: 3 }}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add New Item
          </Typography>
          <Stack width="100%" direction="row" spacing={3} mt={2}>
            <TextField
              id="outlined-basic"
              label="Item"
              variant="outlined"
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              sx={{ bgcolor: "#ffffff", borderRadius: 1 }}
            />
            <Button
              variant="contained"
              onClick={() => {
                addItem(itemName);
                setItemName("");
                handleClose();
              }}
              sx={{
                bgcolor: "#1976d2",
                color: "#fff",
                ":hover": { bgcolor: "#115293" },
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          bgcolor: "#1976d2",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: 2,
          ":hover": { bgcolor: "#115293" },
        }}
      >
        Add New Item
      </Button>
      <Box
        sx={{
          border: "1px solid #333",
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "#e3f2fd",
          width: "fit-content",
        }}
      >
        <Box
          sx={{
            width: "800px",
            height: "100px",
            bgcolor: "#90caf9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderBottom: "1px solid #333",
          }}
        >
          <Typography variant="h4" color="#333" textAlign="center">
            Inventory Items
          </Typography>
        </Box>
        <Stack
          sx={{
            width: "800px",
            height: "300px",
            spacing: 2,
            padding: 2,
            overflowY: "auto",
            bgcolor: "#f7f7f7",
          }}
        >
          {inventory.map(({ name, quantity }) => (
            <Box
              key={name}
              sx={{
                width: "100%",
                minHeight: "150px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                bgcolor: "#e0e0e0",
                padding: "20px",
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" color="#333">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h6" color="#333">
                Quantity: {quantity}
              </Typography>
              <Button
                variant="contained"
                onClick={() => removeItem(name)}
                sx={{
                  bgcolor: "#d32f2f",
                  color: "#fff",
                  ":hover": { bgcolor: "#9a0007" },
                }}
              >
                Remove
              </Button>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
