import React, { useState } from 'react';
import CategorySelector from './CategorySelector';
import { ReactComponent as Plus } from '../images/plus.svg';
import { FilterContainer, Form, FormButtonGroup } from '../elements/Form';
import { Input, LargeInput } from '../elements/Form';
import { HeaderButton } from '../elements/Header';
import DatePicker from './DatePicker';

const ExpenseForm = () => {
  const [selected, setSelected] = useState(new Date());
  const [currentOption, setCurrentOption] = useState({});
  const [description, setDescription] = useState('');
  const [expense, setExpense] = useState('');

  const onChangeInput = ({ target: { name, value } }) => {
    const numberExpression = /[^0-9.]/g;
    const numberInputs = ['expense'];

    const inputs = {
      description: { setValue: (value) => setDescription(value) },
      expense: { setValue: (value) => setExpense(value) }
    }

    if (numberInputs.includes(name)) {
      inputs[name].setValue(value.replace(numberExpression, ''));
    } else {
      inputs[name].setValue(value);
    }
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();

    console.log({ description, expense })
  }

  return (
    <Form onSubmit={onSubmitForm}>
      <FilterContainer>
        <CategorySelector
          currentOption={currentOption}
          setCurrentOption={setCurrentOption}
        />
        
        <DatePicker
          selected={selected}
          setSelected={setSelected}
        />
      </FilterContainer>

      <div>
        <Input
          type='text' name='description' placeholder='Description'
          value={description} onChange={onChangeInput}
        />

        <LargeInput
          type='text' name='expense' placeholder='$0'
          value={expense} onChange={onChangeInput}
        />

        <FormButtonGroup>
          <HeaderButton type='submit' as='button' primary withIcon>
            Add Expense <Plus/>
          </HeaderButton>
        </FormButtonGroup>
      </div>
    </Form>
  );
}
 
export default ExpenseForm;