import emailjs from '@emailjs/browser';
import { Canvas } from '@react-three/fiber';
import { useState } from 'react';

import Fox from '../models/Fox';

const Contact = () => {
  const [animationType, setAnimationType] = useState('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleFocus = () => setAnimationType('walk');

  const handleBlur = () => setAnimationType('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAnimationType('hit');

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: 'Rayhan',
          from_email: form.email,
          to_email: 'rislammb@outlook.com',
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then((res) => {
        console.log('Response', res);
      })
      .catch((err) => {
        console.log('Error', err);
      });

    setTimeout(() => {
      setAnimationType('idle');
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section className='relative flex lg:flex-row flex-col max-container h-[100vh]'>
      <div className='flex-1 min-w-[50%] flex flex-col'>
        <h3 className='head-text'>Contact me</h3>

        <form
          className='w-full flex flex-col gap-7 mt-14'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-1'>
            <label htmlFor='name' className='text-gray-600'>
              Name
            </label>
            <input
              type='text'
              id='name'
              name='name'
              className='shadow-sm focus:shadow text-gray-600 outline-none rounded-lg p-2'
              placeholder='Abdullah..'
              value={form.name}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='email' className='text-gray-600'>
              Email
            </label>
            <input
              type='email'
              id='email'
              name='email'
              className='shadow-sm focus:shadow text-gray-600 outline-none rounded-lg p-2'
              placeholder='abdullah@email.com'
              value={form.email}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor='message' className='text-gray-600'>
              Message
            </label>
            <textarea
              rows={3}
              id='message'
              name='message'
              className='shadow-sm focus:shadow text-gray-600 outline-none rounded-lg p-2'
              placeholder="What's your mind.."
              value={form.message}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>

          <button
            type={'submit'}
            className='bg-green-700 hover:bg-green-800 transition text-white py-1.5 px-6 rounded-lg mx-auto'
          >
            {isSubmitting ? 'Sending..' : 'Send'}
          </button>
        </form>
      </div>

      <div className='lg:w-1/2 w-full lg:h-auto md:h-[500px] h-[350px]'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight intensity={2.5} position={[0, 0, 1]} />
          <ambientLight intensity={0.5} />
          <Fox
            position={[0.5, 0.35, 0]}
            rotation={[12.6, -0.6, 0]}
            scale={[0.5, 0.5, 0.5]}
            animationType={animationType}
          />
        </Canvas>
      </div>
    </section>
  );
};

export default Contact;
