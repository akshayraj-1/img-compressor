$branch = git rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $branch"

# Function to generate a commit message for a file change
function Generate-CommitMessage {
    param (
        [string]$status,
        [string]$fileName
    )

    switch ($status) {
        'A' { return "Added $fileName" }
        'M' { return "Modified $fileName" }
        'D' { return "Deleted $fileName" }
        default { return "Updated $fileName" }
    }
}

$forcePush = $null
while ($forcePush -ne 'Y' -and $forcePush -ne 'N') {
    $forcePush = Read-Host "Do you want to force push to $branch? (Y/N)"
}

# Get the changed files
$diffOutput = git diff --name-status HEAD
if ($diffOutput) {
    $changes = $diffOutput -split "`n"
    Write-Host "============================="
    foreach ($change in $changes) {
        $status = $change.Substring(0, 1)
        $filePath = $change.Substring(2).Trim()
        $fileName = [System.IO.Path]::GetFileName($filePath)

        # Stage the specific file
        git add $filePath

        # Generate commit message for the file change
        $commitMessage = Generate-CommitMessage -status $status -fileName $fileName
        Write-Host "-> Generated commit message for ${fileName}: $commitMessage"

        # Commit the file with the generated commit message
        git commit -m $commitMessage
    }
    Write-Host "============================="
    # Push the commits
    if ($forcePush -eq 'Y') {
        git push origin $branch -f
    } else {
        git push origin $branch
    }

    Write-Host "Git push completed."
} else {
    Write-Host "No changes to commit."
}
