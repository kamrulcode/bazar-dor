interface SectionTitleProps {
  title: string;
  description?: string;
  icon: React.ReactNode;
}

const SectionTitle = ({ title, description, icon }: SectionTitleProps) => {
  return (
    <div className="flex items-baseline gap-2">
      <div>{icon}</div>
      <div className="mb-6">
        <h2 className="text-xl font-bold">{title}</h2>

        {description && (
          <p className="mt-1 text-sm text-base-content/60">{description}</p>
        )}
      </div>
    </div>
  );
};

export default SectionTitle;
