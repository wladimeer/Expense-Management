import useAlert from '../hooks/useAlert';
import CategorySelector from './CategorySelector';
import React, { useEffect, useState } from 'react';
import { ReactComponent as Plus } from '../images/plus.svg';
import { FilterContainer, Form, FormButtonGroup } from '../elements/Form';
import { createExpense, updateExpense } from '../service/expense';
import { SubtitleContainer, Subtitle } from '../elements/List';
import { Input, LargeInput } from '../elements/Form';
import { HeaderButton } from '../elements/Header';
import getUnixTime from 'date-fns/getUnixTime';
import { toTitle } from '../utils/functions';
import { useNavigate } from 'react-router';
import Alert from '../components/Alert';
import DatePicker from './DatePicker';

const ExpenseForm = ({ formType = 'create', expense = {} }) => {
  const navigate = useNavigate();

  const { alert, setAlert } = useAlert();
  const [currentOption, setCurrentOption] = useState({});
  const [loading, setLoading] = useState(formType !== 'create');
  const [selected, setSelected] = useState(new Date());
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [id, setId] = useState('');

  const onChangeInput = ({ target: { name, value } }) => {
    const numberExpression = /[^0-9.]/g;
    const numberInputs = ['quantity'];

    const inputs = {
      description: { setValue: (value) => setDescription(value) },
      quantity: { setValue: (value) => setQuantity(value) }
    }

    if (numberInputs.includes(name)) {
      inputs[name].setValue(value.replace(numberExpression, ''));
    } else {
      inputs[name].setValue(value);
    }
  }

  const onSubmitForm = async (event) => {
    event.preventDefault();

    if (!currentOption.value || [description, quantity].includes('')) {
      setAlert({ visible: true, alertType: 'error', message: 'Check that all fields are completed' });

    } else {
      try {
        const expenseData = {
          description: toTitle(description),
          quantity: Number(quantity),
          category: JSON.stringify(currentOption),
          date: getUnixTime(selected)
        }

        if (formType === 'create') {
          const { message } = await createExpense(expenseData);

          setSelected(new Date());
          setCurrentOption({});
          setDescription('');
          setQuantity('');

          setAlert({ visible: true, alertType: 'success', message: message });
        }

        if (formType === 'update') {
          expenseData.id = id;
          await updateExpense(expenseData);

          navigate('/expense/list');
        }

      } catch ({ message }) {
        setAlert({ visible: true, alertType: 'error', message: message });
      }
    }
  }

  useEffect(() => {
    const { id, description, category, quantity, date } = expense;

    if (expense.id !== undefined) {
      setSelected(date);
      setCurrentOption(category);
      setDescription(description);
      setQuantity(quantity);
      setId(id);

      setLoading(false);
    }

  }, [expense]);

  return (
    <>
      {loading ? (
        <SubtitleContainer>
          <Subtitle>Loading expense...</Subtitle>
        </SubtitleContainer>
      ) : (
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
              type='text' name='quantity' placeholder='$0'
              value={quantity} onChange={onChangeInput}
            />

            <FormButtonGroup>
              <HeaderButton type='submit' as='button' primary withIcon>
                {formType === 'create' ? 'Add' : 'Modify'} Expense <Plus/>
              </HeaderButton>
            </FormButtonGroup>
          </div>
        </Form>
      )}

      <Alert { ...alert } setAlert={setAlert} />
    </>
  );
}
 
export default ExpenseForm;