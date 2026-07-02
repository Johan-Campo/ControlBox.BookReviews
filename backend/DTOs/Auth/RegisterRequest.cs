using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Auth;

public record RegisterRequest(
    [Required(ErrorMessage = "El nombre de usuario es obligatorio.")]
    [MinLength(3, ErrorMessage = "El nombre de usuario debe tener al menos 3 caracteres.")]
    [MaxLength(50, ErrorMessage = "El nombre de usuario no puede superar los 50 caracteres.")]
    string Username,
    [Required(ErrorMessage = "El correo electrónico es obligatorio.")]
    [EmailAddress(ErrorMessage = "El correo electrónico no es válido.")]
    [MaxLength(200, ErrorMessage = "El correo electrónico no puede superar los 200 caracteres.")]
    string Email,
    [Required(ErrorMessage = "La contraseña es obligatoria.")]
    [MinLength(6, ErrorMessage = "La contraseña debe tener al menos 6 caracteres.")]
    string Password
);
