using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Auth;

public record ResetPasswordRequest(
    [Required(ErrorMessage = "El token es obligatorio.")] string Token,
    [Required(ErrorMessage = "La nueva contraseña es obligatoria.")]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres.")]
    string NewPassword
);
