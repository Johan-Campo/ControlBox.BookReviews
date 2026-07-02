interface AvatarProps {
  username: string;
  photoUrl: string | null;
  size?: number;
}

export function Avatar({ username, photoUrl, size = 64 }: AvatarProps) {
  const initials = username.slice(0, 2).toUpperCase();

  if (photoUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photoUrl}
        alt={`Foto de perfil de ${username}`}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`Foto de perfil de ${username}`}
      className="flex items-center justify-center rounded-full bg-blue-100 font-semibold text-blue-700"
      style={{ width: size, height: size, fontSize: size / 2.5 }}
    >
      {initials}
    </div>
  );
}
