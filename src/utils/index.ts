export const onCopy = (text: string) => {
  try {
    navigator.clipboard.writeText(text);
  } catch (err) {
    console.log(err);
  }
};
