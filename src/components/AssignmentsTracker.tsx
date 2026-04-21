import {supabase} from "../supabase.ts";
import {useEffect, useState} from "react";

type Assignment = {
    id: number;
    created_at: string;
    course_name: string | null;
    title: string | null;
    assigned: string | null;
    due: string | null;
    materials: string | null;
    notes: string | null;
}

const EMPTY_FORM = {
    course_name: "",
    title: "",
    assigned: "",
    due: "",
    materials: "",
    notes: "",
};

export function AssignmentsTracker() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Create state
    const [showAddForm, setShowAddForm] = useState(false);
    const [newForm, setNewForm] = useState(EMPTY_FORM);
    const [creating, setCreating] = useState(false);

    // Edit state
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editForm, setEditForm] = useState(EMPTY_FORM);
    const [saving, setSaving] = useState(false);

    // Delete state
    const [deletingId, setDeletingId] = useState<number | null>(null);

    // READ
    useEffect(() => {
        fetchAssignments();
    }, []);

    async function fetchAssignments() {
        setLoading(true);
        setError(null);
        const { data, error } = await supabase
            .from("AssignmentTracker")
            .select("*")
            .order("due", { ascending: true });
        if (error) setError(error.message);
        else setAssignments(data || []);
        setLoading(false);
    }

    // CREATE
    async function handleCreate() {
        setCreating(true);
        setError(null);
        const { data, error } = await supabase
            .from("AssignmentTracker")
            .insert([newForm])
            .select()
            .single();
        if (error) {
            setError(error.message);
        } else {
            setAssignments((prev) => [...prev, data]);
            setNewForm(EMPTY_FORM);
            setShowAddForm(false);
        }
        setCreating(false);
    }

    // UPDATE
    function startEdit(a: Assignment) {
        setEditingId(a.id);
        setEditForm({
            course_name: a.course_name ?? "",
            title: a.title ?? "",
            assigned: a.assigned ?? "",
            due: a.due ?? "",
            materials: a.materials ?? "",
            notes: a.notes ?? "",
        });
    }

    function cancelEdit() {
        setEditingId(null);
        setEditForm(EMPTY_FORM);
    }

    async function handleUpdate(id: number) {
        setSaving(true);
        setError(null);
        const { data, error } = await supabase
            .from("AssignmentTracker")
            .update(editForm)
            .eq("id", id)
            .select()
            .single();
        if (error) {
            setError(error.message);
        } else {
            setAssignments((prev) => prev.map((a) => (a.id === id ? data : a)));
            setEditingId(null);
        }
        setSaving(false);
    }

    // DELETE
    async function handleDelete(id: number) {
        setDeletingId(id);
        setError(null);
        const { error } = await supabase
            .from("AssignmentTracker")
            .delete()
            .eq("id", id);
        if (error) {
            setError(error.message);
        } else {
            setAssignments((prev) => prev.filter((a) => a.id !== id));
        }
        setDeletingId(null);
    }

    if (loading) return <p>Loading...</p>;
    if (assignments.length === 0 && !showAddForm) return <p>No assignments found.</p>;

    return (
        <div className="assignments-container">
            <h1>Assignments Tracker</h1>
            <p>Track your assignments with Supabase database integration</p>

            {error && <p style={{color: "red"}}>{error}</p>}

            <button onClick={() => setShowAddForm((v) => !v)}>
                {showAddForm ? "Cancel" : "+ Add Assignment"}
            </button>

            {showAddForm && (
                <table border={1} cellPadding="8">
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Course</th>
                        <th>Assigned</th>
                        <th>Due</th>
                        <th>Materials</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><input value={newForm.title} onChange={(e) => setNewForm((f) => ({...f, title: e.target.value}))} /></td>
                        <td><input value={newForm.course_name} onChange={(e) => setNewForm((f) => ({...f, course_name: e.target.value}))} /></td>
                        <td><input type="date" value={newForm.assigned} onChange={(e) => setNewForm((f) => ({...f, assigned: e.target.value}))} /></td>
                        <td><input type="date" value={newForm.due} onChange={(e) => setNewForm((f) => ({...f, due: e.target.value}))} /></td>
                        <td><input value={newForm.materials} onChange={(e) => setNewForm((f) => ({...f, materials: e.target.value}))} /></td>
                        <td><input value={newForm.notes} onChange={(e) => setNewForm((f) => ({...f, notes: e.target.value}))} /></td>
                        <td>
                            <button onClick={handleCreate} disabled={creating}>{creating ? "Saving..." : "Save"}</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )}

            <table border={1} cellPadding="8">
                <thead>
                <tr>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Assigned</th>
                    <th>Due</th>
                    <th>Materials</th>
                    <th>Notes</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {assignments.map((a) => (
                    <tr key={a.id}>
                        {editingId === a.id ? (
                            <>
                                <td><input value={editForm.title} onChange={(e) => setEditForm((f) => ({...f, title: e.target.value}))} /></td>
                                <td><input value={editForm.course_name} onChange={(e) => setEditForm((f) => ({...f, course_name: e.target.value}))} /></td>
                                <td><input type="date" value={editForm.assigned} onChange={(e) => setEditForm((f) => ({...f, assigned: e.target.value}))} /></td>
                                <td><input type="date" value={editForm.due} onChange={(e) => setEditForm((f) => ({...f, due: e.target.value}))} /></td>
                                <td><input value={editForm.materials} onChange={(e) => setEditForm((f) => ({...f, materials: e.target.value}))} /></td>
                                <td><input value={editForm.notes} onChange={(e) => setEditForm((f) => ({...f, notes: e.target.value}))} /></td>
                                <td>
                                    <button onClick={() => handleUpdate(a.id)} disabled={saving}>{saving ? "Saving..." : "Save"}</button>
                                    <button onClick={cancelEdit}>Cancel</button>
                                </td>
                            </>
                        ) : (
                            <>
                                <td>{a.title}</td>
                                <td>{a.course_name}</td>
                                <td>{a.assigned}</td>
                                <td>{a.due}</td>
                                <td>{a.materials}</td>
                                <td>{a.notes}</td>
                                <td>
                                    <button onClick={() => startEdit(a)}>Edit</button>
                                    <button onClick={() => handleDelete(a.id)} disabled={deletingId === a.id}>
                                        {deletingId === a.id ? "Deleting..." : "Delete"}
                                    </button>
                                </td>
                            </>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}