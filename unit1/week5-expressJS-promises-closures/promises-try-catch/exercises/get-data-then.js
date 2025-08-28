function getData() {
  const data = fetch()
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return data;
}
