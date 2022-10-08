import express from "express";
import { db } from "../firebase.js";
import {
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  doc,
  query,
  where,
} from "firebase/firestore/lite";
import { searchByName, searchByCategory } from "../searchEmoji.js";

const route = express.Router();
export default route;

//Routes

route.post("/add", async (req, res) => {
  if (await checkExist(req.body))
    return res.status(405).end(`${req.body.name} already exists.`);

  const category = req.body.category.replace(" ", "_");
  // Add a new document with a generated id.
  const iconsList = await getEmoji(req.body.name, category);
  const docRef = await addDoc(db.products, {
    name: req.body.name,
    category: category,
    emojiList: iconsList,
    expiryDays: categoryDays[category].expiryDate,
    emoji: iconsList[0].character,
    supportRate: 1,
    createdBy: "",
    refrigerator: req.body.refrigerator,
    nameVariation: [],
  }).then(() => {
    res.json({ message: "added " + req.body.name + " successfully" });
  });
});

route.get("/search", async (req, res) => {
  const item = req.query.item;
  if (!item) return res.json("query was empty");
  const searchRes = query(db.products, where("name", "==", item));
  return res.json(
    (await getDocs(searchRes)).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
});

route.get("/search/:category", async (req, res) => {
  const searchRes = query(
    db.products,
    where("category", "==", req.query.category)
  );
  return res.json(
    (await getDocs(searchRes)).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
});

route.post("/delete", async (req, res) => {
  try {
    await deleteDoc(doc(db.products, req.body.id));
    return res.json("item was deleted successfully");
  } catch (err) {
    return res.json(err);
  }
});

route.post("/update/:id", async (req, res) => {
  await updateDoc(doc(db.products, req.body.id), { icon: req.body.icon });
  return res.json("icon was updated");
});

route.get("/all", async (req, res) => {
  return res.json(
    (await getDocs(db.products)).docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }))
  );
});

//Functions

async function getProducts() {
  const productsSnapshot = await getDocs(db.products);
  return productsSnapshot.docs.map((doc) => doc.data());
}

async function checkExist(item) {
  const result = query(
    db.products,
    where("name", "==", item.name),
    where("category", "==", item.category)
  );
  return (await getDocs(result)).docs.length;
}

const categoryDays = {
  fruits: {
    expiryDate: 30,
  },
  vegetables: {
    expiryDate: 14,
  },
  dairy: {
    expiryDate: 10,
  },
  meat: {
    expiryDate: 360,
  },
  pantry: {
    expiryDate: 360,
  },
  wine: {
    expiryDate: 1855,
  },
  ice_cream: {
    expiryDate: 45,
  },
};

function getEmoji(name, category) {
  const resName = searchByName(name, category);
  if (resName.length) return resName;
  return searchByCategory(category);
}
