const REPO_OWNER = "Anjaliavv51";
const REPO_NAME = "Matrubodhah";
const GITHUB_TOKEN = ""; // Optional: GitHub personal access token

async function fetchContributors() {
  const contributorsContainer = document.getElementById("contributors");

  try {
    const response = await fetch(`https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors`, {
      headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
    });

    if (!response.ok) throw new Error("Failed to fetch contributors");

    const contributors = await response.json();

    contributors.forEach((contributor) => {
      const card = document.createElement("div");
      card.className = "contributor-card";

      const img = document.createElement("img");
      img.src = contributor.avatar_url;
      img.alt = contributor.login;

      const name = document.createElement("h3");
      name.textContent = contributor.login;

      const githubLink = document.createElement("a");
      githubLink.href = contributor.html_url;
      githubLink.target = "_blank";
      githubLink.innerHTML = '<i class="fab fa-github"></i> <span>GitHub</span>';
      
      const certButton = document.createElement("button");
      certButton.textContent = "🎓 Generate Certificate";
      certButton.className = "btn btn-warning mt-3";
      certButton.onclick = () => generateCertificate(contributor.login, contributor.avatar_url);

      // Append elements to the contributor card
      card.appendChild(img);
      card.appendChild(name);
      card.appendChild(githubLink);
      card.appendChild(certButton);

      // Append the card to the container
      contributorsContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    contributorsContainer.innerHTML = `<p style="color: red;">Failed to load contributors</p>`;
  }
}

async function fetchGitHubStats() {
  try {
    const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
    const repoResponse = await fetch(API_BASE);
    const repoData = await repoResponse.json();

    const contributorsResponse = await fetch(`${API_BASE}/contributors`);
    const contributorsData = await contributorsResponse.json();

    const totalContributions = contributorsData.reduce((total, c) => total + c.contributions, 0);

    document.getElementById("contributors-count").innerText = contributorsData.length;
    document.getElementById("commits-count").innerText = totalContributions;
    document.getElementById("stars-count").innerText = repoData.stargazers_count;
    document.getElementById("forks-count").innerText = repoData.forks_count;
  } catch (error) {
    console.error("Error fetching stats:", error);
  }
}

// Function to generate a certificate
function generateCertificate(username, avatarUrl) {
  const canvas = document.getElementById("certificateCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1600;
  canvas.height = 1000;

  // Create background gradient
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#f7e8a1");
  gradient.addColorStop(1, "#f2c94c");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Decorative border
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 20;
  ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

  // Title and styling
  ctx.fillStyle = "#5a4637";
  ctx.font = "bold 80px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("Certificate of Contribution", canvas.width / 2, 150);

  // Drawing the user's image
  const image = new Image();
  image.crossOrigin = "Anonymous"; // Avoid CORS issues
  image.src = avatarUrl;
  image.onload = () => {
    const imageSize = 200;
    ctx.save();
    ctx.beginPath();
    ctx.arc(canvas.width / 2, 300, imageSize / 2, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(image, canvas.width / 2 - imageSize / 2, 200, imageSize, imageSize);
    ctx.restore();

    // Username under the image
    ctx.font = "bold 50px Arial";
    ctx.fillText(username, canvas.width / 2, 500);

    // Content for the certificate
    ctx.font = "35px Arial";
    const content = `This certificate is proudly awarded to ${username} in recognition of their exceptional
                     contributions and dedication to ${REPO_NAME}. Your efforts have greatly
                     enriched the project during the Social Winter of Code (SWoC) program, held from January
                     1, 2025,to March 1, 2025. We commend your passion, creativity,and commitment to
                     open-source collaboration and look forward to seeing your continued success.`;
    const contentLines = content.split("\n");
    contentLines.forEach((line, index) => {
      ctx.fillText(line.trim(), canvas.width / 2, 600 + index * 40);
    });

    // Signature and date
    ctx.font = "30px 'Playwrite VN', serif";
    ctx.fillText("P.Lakshmi Pavananjali", canvas.width / 1.5, 850);
    ctx.strokeStyle = "#5a4637";
    ctx.lineWidth = 2;
    ctx.beginPath(); 
    ctx.moveTo(canvas.width / 1.5 - 150, 860);
    ctx.lineTo(canvas.width / 1.5 + 150, 860);
    ctx.stroke();

    // Date of generation
    const date = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    ctx.font = "25px Arial";
    ctx.fillText(`Generated on: ${date}`, canvas.width / 5, 900);

    // Show the modal
    const certificateModal = new bootstrap.Modal(document.getElementById("certificateModal"));
    certificateModal.show();

    // Download link
    const downloadLink = document.getElementById("downloadCertificate");
    downloadLink.href = canvas.toDataURL("image/png");
  };
}

fetchContributors();
fetchGitHubStats();
