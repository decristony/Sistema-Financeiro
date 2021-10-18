import { useState, useEffect } from "react";
import * as C from "./App.Styles";
import { Item } from "./types/item";
import { categories } from "./data/categories";
import { items } from "./data/items";
import { getCurrentMounth, FillterListByMonth } from "./helpers/dateFilter";
import { TableArea } from "./components/tableArea";
import { InfoArea } from "./components/InfoArea";
import { InputArea } from "./components/inputArea";

const App = () => {
  const [list, setList] = useState(items);
  const [filteredList, setFilteredList] = useState<Item[]>([]);
  const [currentMounth, setCurrentMounth] = useState(getCurrentMounth());

  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  useEffect(() => {
    let incomeCount = 0;
    let expenseCount = 0;

    for (let i in filteredList) {
      if (categories[filteredList[i].category].expense) {
        expenseCount += filteredList[i].value;
      } else {
        incomeCount += filteredList[i].value;
      }
    }

    setIncome(incomeCount);
    setExpense(expenseCount);
  }, [filteredList]);

  useEffect(() => {
    setFilteredList(FillterListByMonth(list, currentMounth));
  }, [list, currentMounth]);

  const handleMonthChange = (newMonth: string) => {
    setCurrentMounth(newMonth);
  };

  const handleAddItem = (item: Item) => {
    let newList = [...list];
    newList.push(item);
    setList(newList);
  };

  return (
    <C.Container>
      <C.Header>
        <C.HeaderText>Sistema Financeiro</C.HeaderText>
      </C.Header>
      <C.Body>
        {/*area de informaçoes*/}
        <InfoArea
          currentMonth={currentMounth}
          onMonthChange={handleMonthChange}
          income={income}
          expense={expense}
        />

        {/*area de inserção*/}
        <InputArea onAdd={handleAddItem} />

        {/*tabela de itens*/}
        <TableArea list={filteredList} />
      </C.Body>
    </C.Container>
  );
};

export default App;
