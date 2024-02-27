import Pusher from 'pusher-js';

const options = {
  cluster: 'ap1',
  encrypted: true,
}

export const pusher = new Pusher('b24a038069190c25cd3b', options)

