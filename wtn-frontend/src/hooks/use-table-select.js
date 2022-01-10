import { useState } from "react";

const useTableSelect = entities => {
  const [selectedEntities, setSelectedEntities] = useState([]);

  const handleSelectAll = event => {
    const selectedEntities = event.target.checked
      ? entities.map(test => test.id)
      : [];

    setSelectedEntities(selectedEntities);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedEntities.indexOf(id);
    let newSelectedEntities = [];

    if (selectedIndex === -1) {
      newSelectedEntities = newSelectedEntities.concat(selectedEntities, id);
    } else if (selectedIndex === 0) {
      newSelectedEntities = newSelectedEntities.concat(
        selectedEntities.slice(1)
      );
    } else if (selectedIndex === selectedEntities.length - 1) {
      newSelectedEntities = newSelectedEntities.concat(
        selectedEntities.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedEntities = newSelectedEntities.concat(
        selectedEntities.slice(0, selectedIndex),
        selectedEntities.slice(selectedIndex + 1)
      );
    }

    setSelectedEntities(newSelectedEntities);
  };

  return {
    selectedEntities,
    handleSelectAll,
    handleSelectOne,
  };
};

export default useTableSelect;
