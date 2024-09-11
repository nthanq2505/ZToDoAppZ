function fetchTasks(user) {
    return fetch(`${ApiRoot}/api/get-tasks`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user.token}`,
        },
    })
    .then((response) => response.json())
    .then((data) => {
        localStorage.setItem("tasks", JSON.stringify(data));
        return data;
    })
    .catch((error) => {
        console.log("Error fetching tasks: ", error);
        return [];
    });
}