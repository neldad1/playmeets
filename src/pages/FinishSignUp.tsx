import { useState, ChangeEvent, useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { FlexColumn } from './Pages.styled';
import { displayError } from '../common/AlertMessage';
import { AuStates } from '../common/DataObjects';
import { setDocument } from '../common/Firebase';
import { CurrentUserContext } from '../context/CurrentUser';
import { isObjectEmpty } from '../common/Helpers';

const { Option } = Select;

const AGE_GROUP: string[] = ['0-3', '4-6', '7-9', '10-12'];

const FinishSignUp = () => {
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [ageGroup, setAgeGroup] = useState(AGE_GROUP);

  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isObjectEmpty(currentUser)) return;
    if (currentUser.data.state) {
      if (currentUser.data.state.length > 0) navigate('/events');
    }
  }, [currentUser]);

  const onCheckboxGrpChange = (checkedValues: CheckboxValueType[]) => {
    setAgeGroup(checkedValues as string[]);
  };

  const onFinish = async () => {
    if (!currentUser) return;
    const userData = {
      ...currentUser.data,
      displayName,
      city,
      state,
      ageGroup,
    };
    try {
      setDocument('users', currentUser.id, userData);
    } catch (err) {
      displayError(`An error occurred while adding the user: ${err}`);
    }
  };

  if (isObjectEmpty(currentUser)) return <></>;
  return (
    <FlexColumn>
      <Form layout="vertical">
        <Form.Item label={currentUser.data.email} />
        <Form.Item label="Display Name" required>
          <Input
            placeholder="Preferred name to display."
            value={displayName}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setDisplayName(e.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="State" required>
          <Select onChange={(val: string) => setState(val)}>
            {AuStates.map((state: string, index: number) => (
              <Option key={index} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="City" required>
          <Input
            placeholder="Enter the city."
            value={city}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCity(e.target.value)
            }
          />
        </Form.Item>
        <Checkbox.Group options={AGE_GROUP} onChange={onCheckboxGrpChange} />
        <Form.Item>
          <Button type="primary" onClick={onFinish}>
            Finish Signing Up
          </Button>
        </Form.Item>
      </Form>
    </FlexColumn>
  );
};

export default FinishSignUp;
