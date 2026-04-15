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

export function AssignmentsTracker() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAssignments() {
            const { data, error } = await supabase
                .from('AssignmentTracker')
                .select('*');
            console.log('data:', data, 'error:', error);
            if (!error) setAssignments(data || []);
            setLoading(false);
        }
        fetchAssignments();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (assignments.length === 0) return <p>No assignments found.</p>;


    return (
    <div className="assignments-container">
      <h1>Assignments Tracker</h1>
      <p>Track your assignments with Supabase database integration</p>
        <table border={1} cellPadding="8">
            <thead>
            <tr>
                <th>Title</th>
                <th>Course</th>
                <th>Assigned</th>
                <th>Due</th>
                <th>Materials</th>
                <th>Notes</th>
            </tr>
            </thead>
            <tbody>
            {assignments.map((a) => (
                <tr key={a.id}>
                    <td>{a.title}</td>
                    <td>{a.course_name}</td>
                    <td>{a.assigned}</td>
                    <td>{a.due}</td>
                    <td>{a.materials}</td>
                    <td>{a.notes}</td>
                </tr>
            ))}
            </tbody>
        </table>

    </div>
  );
}
