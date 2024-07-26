// jobController.js
import { jobsCollections } from "../dbConfig/dbCollections.js";
import { ObjectId } from "mongodb";

export const postJob = async (req, res) => {
  try {
    const body = req.body;
    body.createdAt = new Date();
    const result = await jobsCollections.insertOne(body);
    if (result.insertedId) {
      return res.status(200).send(result);
    } else {
      return res.status(400).send({
        message: "Something went wrong! Please try again later.",
        status: false,
      });
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await jobsCollections.find().toArray();
    res.send(jobs);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobsCollections.findOne({ _id: new ObjectId(id) });
    res.send(job);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getJobsByEmail = async (req, res) => {
  try {
    const jobs = await jobsCollections
      .find({ postedBy: req.params.email })
      .toArray();
    res.send(jobs);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const result = await jobsCollections.deleteOne(filter);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateJob = async (req, res) => {
  try {
    const id = req.params.id;
    const jobData = req.body;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updateDoc = {
      $set: {
        ...jobData,
      },
    };
    const result = await jobsCollections.updateOne(filter, updateDoc, options);
    res.send(result);
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
