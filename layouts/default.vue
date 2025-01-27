<template>
  <div>
    <div class="lg:hidden">
      <MobileMenu />
      <NuxtPage />
    </div>

    <div class="hidden lg:block">
      <SidebarView>
        <UiSidebarInset>
          <Navbar />
          <NuxtPage />
        </UiSidebarInset>
      </SidebarView>
    </div>
  </div>
</template>
