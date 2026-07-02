using System.ComponentModel.DataAnnotations;

namespace BookReviewsApi.DTOs.Reviews;

public record CreateReviewRequest(
    [Required(ErrorMessage = "La calificación es obligatoria.")]
    [Range(1, 5, ErrorMessage = "La calificación debe estar entre 1 y 5.")]
    int Rating,
    [Required(ErrorMessage = "El comentario es obligatorio.")]
    [MinLength(10, ErrorMessage = "El comentario debe tener al menos 10 caracteres.")]
    [MaxLength(2000, ErrorMessage = "El comentario no puede superar los 2000 caracteres.")]
    string Comment
);
