FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY BookReviewsApi.csproj .
RUN dotnet restore BookReviewsApi.csproj

COPY . .
RUN dotnet publish BookReviewsApi.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime
WORKDIR /app
COPY --from=build /app .

ENV ASPNETCORE_ENVIRONMENT=Production
ENTRYPOINT ["dotnet", "BookReviewsApi.dll"]
