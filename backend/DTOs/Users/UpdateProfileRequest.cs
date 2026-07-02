using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Users;

public record UpdateProfileRequest(
    [Url(ErrorMessage = "La URL de la foto de perfil no es válida.")]
    [MaxLength(500, ErrorMessage = "La URL de la foto de perfil no puede superar los 500 caracteres.")]
    string? ProfilePhotoUrl
);
