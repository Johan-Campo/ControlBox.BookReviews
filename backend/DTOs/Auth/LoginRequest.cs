using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Auth;

public record LoginRequest(
    [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
    [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
    string Email,
    [Required(ErrorMessage = "La contraseña es obligatoria.")] string Password
);
