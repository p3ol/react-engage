import Link from 'next/link';

const Foo = () => {
  return (
    <div>
      <h1>Foo</h1>
      <p>
        This is the Foo page.
        You shouldn&apos;t see elements from previous page.
      </p>
      <Link href="/">Back to Home</Link>
    </div>
  );
};

export default Foo;
