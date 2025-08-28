// Simple helper functions
export const findById = (id: string, data: any[]) => 
  data.find(item => item.id === id);

export const getName = (id: string, data: any[]) => {
  const item = findById(id, data);
  return item?.name || item?.label || '';
};

export const getNames = (ids: string[], data: any[]) => 
  ids.map(id => getName(id, data)).filter(Boolean);

export const getColor = (typeId: string, types: any[]) => 
  findById(typeId, types)?.color || '#f39c12';