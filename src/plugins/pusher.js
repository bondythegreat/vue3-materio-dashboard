import Pusher from 'pusher-js';

const options = {
  cluster: 'ap1',
  encrypted: true,
}

export const pusher = new Pusher(import.meta.env.VITE_PUSHER_API_KEY, options)

