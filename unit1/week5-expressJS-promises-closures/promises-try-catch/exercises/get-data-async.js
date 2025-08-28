async function getData() {
  try {
    const response = await fetch();
    const data = response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

