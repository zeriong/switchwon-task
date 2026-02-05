interface PageHeaderProps {
  title: string;
  description: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <>
      <h2 className="text-xl md:text-[40px] font-bold text-pr-gray-800 mb-2">
        {title}
      </h2>
      <p className="text-sm md:text-base text-pr-gray-700 mb-4 md:mb-10">
        {description}
      </p>
    </>
  );
}
