Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicDirectory = Join-Path $projectRoot "public"
$faviconPath = Join-Path $publicDirectory "favicon.ico"
$profilePath = Join-Path $projectRoot "src\images\cowboyhat-profile.jpg"

function New-SquareIcon {
  param(
    [int]$Size,
    [string]$OutputPath
  )

  $source = [System.Drawing.Image]::FromFile($faviconPath)
  $bitmap = New-Object System.Drawing.Bitmap($Size, $Size)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  $graphics.Clear([System.Drawing.Color]::White)
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $padding = [Math]::Round($Size * 0.04)
  $graphics.DrawImage($source, $padding, $padding, $Size - (2 * $padding), $Size - (2 * $padding))
  $bitmap.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $graphics.Dispose()
  $bitmap.Dispose()
  $source.Dispose()
}

New-SquareIcon -Size 180 -OutputPath (Join-Path $publicDirectory "apple-touch-icon.png")
New-SquareIcon -Size 192 -OutputPath (Join-Path $publicDirectory "icon-192.png")
New-SquareIcon -Size 512 -OutputPath (Join-Path $publicDirectory "icon-512.png")

$canvas = New-Object System.Drawing.Bitmap(1200, 630)
$graphics = [System.Drawing.Graphics]::FromImage($canvas)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
$graphics.Clear([System.Drawing.ColorTranslator]::FromHtml("#101826"))

$accentBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#007bff"))
$highlightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#ffdd57"))
$whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$mutedBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#dbeafe"))
$graphics.FillRectangle($accentBrush, 0, 0, 14, 630)
$graphics.FillRectangle($highlightBrush, 72, 154, 110, 8)

$nameFont = New-Object System.Drawing.Font("Segoe UI", 43, [System.Drawing.FontStyle]::Bold)
$roleFont = New-Object System.Drawing.Font("Segoe UI", 25, [System.Drawing.FontStyle]::Regular)
$siteFont = New-Object System.Drawing.Font("Segoe UI", 16, [System.Drawing.FontStyle]::Regular)
$graphics.DrawString("PATRICK ENGELBERT", $nameFont, $whiteBrush, 70, 72)
$graphics.DrawString("Software Engineer", $roleFont, $mutedBrush, 70, 198)
$graphics.DrawString("Robotics & Industrial Automation", $roleFont, $mutedBrush, 70, 244)
$graphics.DrawString("www.patrickengelbert.com", $siteFont, $whiteBrush, 72, 545)

$profile = [System.Drawing.Image]::FromFile($profilePath)
$sourceWidth = [int]($profile.Height * (470 / 630))
$sourceX = [int](($profile.Width - $sourceWidth) / 2)
$sourceRectangle = New-Object System.Drawing.Rectangle($sourceX, 0, $sourceWidth, $profile.Height)
$destinationRectangle = New-Object System.Drawing.Rectangle(730, 0, 470, 630)
$graphics.DrawImage($profile, $destinationRectangle, $sourceRectangle, [System.Drawing.GraphicsUnit]::Pixel)
$graphics.FillRectangle($highlightBrush, 720, 0, 10, 630)

$canvas.Save((Join-Path $publicDirectory "social-preview.png"), [System.Drawing.Imaging.ImageFormat]::Png)

$profile.Dispose()
$nameFont.Dispose()
$roleFont.Dispose()
$siteFont.Dispose()
$accentBrush.Dispose()
$highlightBrush.Dispose()
$whiteBrush.Dispose()
$mutedBrush.Dispose()
$graphics.Dispose()
$canvas.Dispose()

Write-Output "Generated favicon derivatives and social-preview.png."
