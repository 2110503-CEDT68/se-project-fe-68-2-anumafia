import Link from 'next/link';

export default function TopMenuItem({ title, pageRef }: { title: string, pageRef: string }) {
  return (
    <Link 
      href={pageRef} 
      className="px-4 py-2 font-bold text-gray-700 hover:text-gray-900 transition-colors duration-200"
    >
      {title}
    </Link>
  );
}