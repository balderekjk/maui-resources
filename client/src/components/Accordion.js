import React, { useState } from 'react';

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (id) => {
    setActiveIndex(id);
  };

  // Arrays, Arrays, Arrays! Are the ways!
  // Then map over the array like...
  // const newV2 = array.map(any => {return structuring})
  const renderedItems = items.map((item, id) => {
    const active = id === activeIndex ? 'active' : '';

    return (
      <React.Fragment key={item.title}>
        <div className={`title ${active}`} onClick={() => onTitleClick(id)}>
          {item.title}
        </div>
        <div className={`content ${active}`}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div>{renderedItems}</div>;
};

export default Accordion;
