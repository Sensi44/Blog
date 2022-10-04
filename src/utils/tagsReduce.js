export const getTagsValue = (arr) => {
  return arr.tagList.reduce(
    (acc, elem, index) => {
      acc[`tag${index}`] = elem;
      return acc;
    },
    {
      title: arr?.title,
      description: arr?.description,
      text: arr?.body,
    }
  );
};

export const getTagList = (arr) => {
  return arr.map((item, index) => {
    let temp = false;
    if (index === arr.length - 1) {
      temp = true;
    }
    return {
      key: index,
      title: `tag${index}`,
      last: temp,
      id: index,
      required: true,
    };
  });
};
