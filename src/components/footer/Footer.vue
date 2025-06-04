<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <p class="footer-title">L2P Bar</p>
        <p>Level up, drink up, and get discounts while you play!</p>
      </div>
      <div class="footer-section">
        <p class="footer-title">Links</p>
        <ul>
          <li>
            <RouterLink to="/character">Character</RouterLink>
          </li>
          <li>
            <RouterLink to="/items">Items</RouterLink>
          </li>
          <li>
            <RouterLink to="/achievements">Achievements</RouterLink>
          </li>
        </ul>
      </div>
      <div class="footer-section">
        <p class="footer-title">Contact</p>
        <p>Email: <a href="mailto:info@l2pevents.cz">info@l2pevents.cz</a></p>
        <p>Made with ❤️ in Brno</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {

  color: #ccc;
  padding: 0.5rem 0.5rem;
  height: 14vh;
  font-size: 0.95rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  width: 100%;
}

.footer-section {
  flex: 1 1 200px;
  min-width: 150px;
  /* added to avoid too narrow sections */
}

.footer-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #ffd369;
}

a {
  color: #ffd369;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

/* Mobile-friendly adjustments */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: stretch;
    /* changed to stretch for equal width */
    gap: 0.5rem;
    /* slightly tighter gap */
  }

  .footer-section {
    width: 100%;
    flex: 1 1 100px;
  }

  .footer {
    font-size: 1rem;
    text-align: left;
  }
}
</style>
