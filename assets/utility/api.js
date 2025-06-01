async function fetchData(query) {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return null;
  }
}
