export const useEmployee = () => {
  const createEmployee = (person, employees, close, localStorageKey) => {
    if (!person.lastname || !person.name) {
      return;
    }

    person.id = new Date();
    person.head = person.lastname.length >= 8 ? "заведующий" : "-";
    employees.push(person);

    saveToLocalStorage(localStorageKey, employees);
    close();
  };

  const updateEmployee = (person, employees, close, localStorageKey) => {
    if (!person.lastname || !person.name) {
      return;
    }

    const index = employees.findIndex((emp) => emp.id === person.id);

    if (index !== -1) {
      employees[index] = { ...person };
    }

    saveToLocalStorage(localStorageKey, employees);
    close();
  };

  const deleteEmployee = (id, employees, close, localStorageKey) => {
    const index = employees.findIndex((emp) => emp.id === id);

    if (index !== -1) {
      employees.splice(index, 1);
    }
    saveToLocalStorage(localStorageKey, employees);
    close();
  };

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  };

  return {
    createEmployee,
    updateEmployee,
    deleteEmployee,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
};
