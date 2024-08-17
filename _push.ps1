$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Current Branch: $branch"
Write-Host "Do you want to force push? (y/n)"
$force_push = Read-Host
git add .
git commit -m "Auto Update"

if ($force_push -eq "y") {
    git push -u -f origin $branch
} else {
    git push -u origin $branch
}
Write-Host "Pushed Successfully"