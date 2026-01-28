import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addJobStart,
  addJobSuccess,
  addJobFailure,
} from "@/store/slices/jobSlice";

function AddJob() {
  const [form, setForm] = useState({
    title: "",
    company: "",
    description: "",
    skills: "",
    ctc: "",
    location: "",
    deadline: "",
    applicationLink: "",
  });
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    dispatch(addJobStart());
    try {
      const postData = {
        ...form,
        skills: form.skills.split(",").map((s) => s.trim()),
      };
      const response = await axios.post(
        "http://localhost:4000/api/jobs",
        postData,
        {
          withCredentials: true,
        }
      );
      dispatch(addJobSuccess(response.data.job));
      setSuccess("Job posted successfully!");
      setForm({
        title: "",
        company: "",
        description: "",
        skills: "",
        ctc: "",
        location: "",
        deadline: "",
        applicationLink: "",
      });
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Failed to post job.";
      dispatch(addJobFailure(errorMsg));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">Add New Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">Title *</label>
          <input
            type="text"
            name="title"
            required
            className="w-full border p-2 rounded"
            value={form.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-semibold">Company Name *</label>
          <input
            type="text"
            name="company"
            required
            className="w-full border p-2 rounded"
            value={form.company}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-semibold">Location *</label>
          <input
            type="text"
            name="location"
            required
            className="w-full border p-2 rounded"
            value={form.location}
            onChange={handleChange}
            placeholder="Bangalore / Remote"
          />
        </div>
        <div>
          <label className="block font-semibold">Description *</label>
          <textarea
            name="description"
            required
            className="w-full border p-2 rounded"
            value={form.description}
            onChange={handleChange}
            rows="4"
          />
        </div>
        <div>
          <label className="block font-semibold">
            Skills{" "}
            <span className="text-xs text-gray-500">(comma separated)</span> *
          </label>
          <input
            type="text"
            name="skills"
            required
            className="w-full border p-2 rounded"
            value={form.skills}
            onChange={handleChange}
            placeholder="JavaScript, React, Node.js"
          />
        </div>
        <div>
          <label className="block font-semibold">CTC (in LPA) *</label>
          <input
            type="number"
            name="ctc"
            required
            min="0"
            className="w-full border p-2 rounded"
            value={form.ctc}
            onChange={handleChange}
            placeholder="6"
          />
        </div>
        <div>
          <label className="block font-semibold">Deadline *</label>
          <input
            type="date"
            name="deadline"
            required
            className="w-full border p-2 rounded"
            value={form.deadline}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block font-semibold">
            Application Link (optional)
          </label>
          <input
            type="url"
            name="applicationLink"
            className="w-full border p-2 rounded"
            value={form.applicationLink}
            onChange={handleChange}
            placeholder="https://..."
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold"
        >
          Post Job
        </button>
        {success && <div className="text-green-600 p-2">{success}</div>}
      </form>
    </div>
  );
}

export default AddJob;
