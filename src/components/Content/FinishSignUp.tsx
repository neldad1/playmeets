import { useState, SyntheticEvent } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { displayError } from '../../Common/AlertMessage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, setDocument } from '../../Firebase';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { AuthFlexColumn } from '../Content/Content.styled';

const AGE_GROUP: string[] = ['0-3', '4-6', '7-9', '10-12'];

const FinishSignUp = () => {
  const [user] = useAuthState(auth);
  const [displayName, setDisplayName] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [ageGroup, setAgeGroup] = useState(AGE_GROUP);

  const navigate = useNavigate();

  const onCheckboxGrpChange = (checkedValues: CheckboxValueType[]) => {
    setAgeGroup(checkedValues as string[]);
  };

  const onFinish = async () => {
    if (!user) return;
    let data = {
      displayName,
      city,
      state,
      ageGroup,
    };
    try {
      setDocument('users', user.uid, data);
      navigate('/events');
    } catch (err) {
      displayError(`An error occurred while adding the user: ${err}`);
    }
  };

  return (
    <AuthFlexColumn>
      <Form layout="vertical">
        <Form.Item label={user?.email} />
        <Form.Item label="Display Name" required>
          <Input
            placeholder="Preferred name to display."
            value={displayName}
            onChange={(e: SyntheticEvent) =>
              setDisplayName((e.target as HTMLInputElement).value)
            }
          />
        </Form.Item>
        <Form.Item label="State" required>
          <Input
            placeholder="Enter the state where you're from."
            value={state}
            onChange={(e: SyntheticEvent) =>
              setState((e.target as HTMLInputElement).value)
            }
          />
        </Form.Item>
        <Form.Item label="City" required>
          <Input
            placeholder="Enter the city."
            value={city}
            onChange={(e: SyntheticEvent) =>
              setCity((e.target as HTMLInputElement).value)
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
    </AuthFlexColumn>
  );
};

export default FinishSignUp;
