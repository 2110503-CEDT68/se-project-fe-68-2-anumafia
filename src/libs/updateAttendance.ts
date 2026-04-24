export default async function updateAttendance(attendanceStatus: string, interviewId: string, token: string) {
    if (!['pending', 'attended', 'absent'].includes(attendanceStatus)) {
        throw new Error('Invalid attendance status');       
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    
    const response = await fetch(`${backendUrl}/api/v1/interviews/${interviewId}/attendance`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ attendanceStatus }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update attendance');
    }

    return await response.json();
}