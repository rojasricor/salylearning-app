import { bungee_spice } from "@/app/fonts";
import Image from "next/image";
import Link from "next/link";
import type { ReactImageGalleryItem } from "react-image-gallery";

interface IProps {
  item: ReactImageGalleryItem;
}

export default function CustomBookItem({ item }: IProps) {
  return (
    <div className="image-gallery-image">
      <Image
        src={item.original}
        alt={item.originalAlt ?? "Imagen del libro"}
        className="image-gallery-image"
        width={400}
        height={500}
        quality={10}
        priority
      />
      {item.description && (
        <article className="image-gallery-description">
          {item.description}{" "}
          {item.isNew && (
            <span
              className={`${bungee_spice.className}`}
              style={{
                fontSize: "0.8rem",
                fontWeight: "bold",
                backgroundColor: "#fff",
                padding: "5px 10px",
                color: "#e21e80",
                borderRadius: "5px",
              }}
            >
              Nuevo!
            </span>
          )}{" "}
          {item.book_url && (
            <Link href={item.book_url} className="btn-book">
              Leer
            </Link>
          )}
        </article>
      )}
    </div>
  );
}
