import { useState, ChangeEvent } from 'react';
import { Button, Form, Input } from 'antd';
import { FlexColumn, Logo } from './Pages.styled';
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
} from '../common/Firebase';
import { Link } from 'react-router-dom';
import { GoogleOutlined } from '@ant-design/icons';
import { displayError } from '../common/AlertMessage';
import { FlexBlock, FlexRowLeft, Label } from '../components/Components.styled';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const register = () => {
    if (!name) displayError('Please enter name');
    registerWithEmailAndPassword(name, email, password);
  };

  return (
    <FlexColumn>
      <Link to="/">
        <Logo src="/playmeets/logo512.svg" alt="Playmeets" />
      </Link>

      <FlexRowLeft>
        <Label>Already a member?</Label>
        <Link to="/login">Log In</Link>
      </FlexRowLeft>

      <Form layout="vertical">
        <Form.Item label="Full Name" required>
          <Input
            placeholder="Enter your full name"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="Email" required>
          <Input
            placeholder="Enter your email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </Form.Item>
        <Form.Item label="Password" name="password" required>
          <Input.Password
            placeholder="Enter your password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </Form.Item>
        <Form.Item>
          <FlexBlock>
            <Button type="primary" onClick={register}>
              Sign Up
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => signInWithGoogle()}
              icon={<GoogleOutlined />}
            >
              Continue with Google
            </Button>
          </FlexBlock>
        </Form.Item>
      </Form>
    </FlexColumn>
  );
};

export default SignUp;
