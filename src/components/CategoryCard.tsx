import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
};

export default function CategoryCard({
  title,
  description,
  imageSrc,
  imageAlt,
}: CategoryCardProps) {
  return (
    <article className="category-card">
      <div className="category-media-wrap">
        <div className="category-media">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={375}
            className="category-image"
          />
        </div>
      </div>

      <div className="category-divider" aria-hidden="true" />

      <div className="category-content">
        <h3 className="category-title">{title}</h3>
        <p className="category-description">{description}</p>
        <span className="category-link">Accepted Category</span>
      </div>
    </article>
  );
}
