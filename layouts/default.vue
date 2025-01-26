<template>
  <div>
    <MobileMenu class="lg:hidden" />
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
