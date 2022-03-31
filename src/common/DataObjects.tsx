import { StepInfo } from './Interfaces';

const AuStates = ['ACT', 'NSW', 'NT', 'SA', 'Tas', 'Vic', 'WA'];

const Steps: StepInfo[] = [
  {
    id: 0,
    imgSrc: 'assets/signup.svg',
    title: 'Sign Up',
    description:
      'Every step starts with signing up to access the events, details and features.',
  },
  {
    id: 1,
    imgSrc: 'assets/viewEvent.svg',
    title: 'Browse or Create an Event',
    description:
      'All events happening in your state are listed. Cannot find any? Create your own event instead.',
  },
  {
    id: 2,
    imgSrc: 'assets/join.svg',
    title: 'Join an Event',
    description:
      'Request to join an event. If the host approves it, pack your bags, prepare your kid and enjoy.',
  },
];

const HOWTITLE = 'How Playmeets Works';
const HOWDESCRIPTION =
  'Meet the parents who are interested to gain some friends and playmates for their kids. Creating an account is free.';

export { AuStates, Steps, HOWTITLE, HOWDESCRIPTION };
