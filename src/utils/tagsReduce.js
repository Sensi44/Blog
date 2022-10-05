export const getTagsValue = (arr) => {
  return arr.tagList.reduce((acc, elem, index) => {
    acc[`tag${index}`] = elem;
    return acc;
  }, {});
};

export const getTagList = (arr) => {
  return arr.map((item, index) => {
    let temp = false;
    if (index === arr.length - 1) {
      temp = true;
    }
    return {
      key: index,
      value: item,
      title: `tag${index}`,
      last: temp,
      id: index,
      required: true,
    };
  });
};

export const addTag = (setCount, setTags, count) => {
  setCount(count + 1);
  setTags((prevState) => {
    return [
      ...prevState,
      {
        key: count,
        title: `tag${count}`,
        last: true,
        id: count,
        required: false,
      },
    ];
  });
};

export const deleteTag = (id, title, unregister, setTags) => {
  unregister(title);

  setTags((prevState) => {
    if (prevState.length === 1) {
      return [];
    }
    const temp = prevState;
    const result = temp.filter((elem) => {
      return elem.id !== id;
    });
    return [...result];
  });
};
