import { message } from 'antd';

const MSG_DISPLAY_DURATION_IN_SEC = 3;

const displayError = (msg: string) => {
  message.error(msg, MSG_DISPLAY_DURATION_IN_SEC);
};

export { displayError };
