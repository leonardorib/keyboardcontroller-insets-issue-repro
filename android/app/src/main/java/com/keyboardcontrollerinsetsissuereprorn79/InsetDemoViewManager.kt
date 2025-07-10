package com.keyboardcontrollerinsetsissuereprorn79

import androidx.compose.runtime.Composable
import androidx.compose.ui.platform.ComposeView
import androidx.compose.ui.platform.LocalDensity

// Layout & insets
import androidx.compose.foundation.layout.WindowInsets
import androidx.compose.foundation.layout.statusBars
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.offset
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.background
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.ui.Alignment

// Material components & icons
import androidx.compose.material.Text
import androidx.compose.material.Icon
import androidx.compose.material.IconButton
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Close

// UI utilities
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.IntOffset
import androidx.compose.ui.unit.dp

// React Native
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext

class InsetDemoViewManager(
  private val reactContext: ReactApplicationContext
) : SimpleViewManager<ComposeView>() {
  override fun getName(): String = "RNInsetDemoView"

  override fun createViewInstance(reactContext: ThemedReactContext): ComposeView {
    return ComposeView(reactContext).apply {
      setContent {
        InsetDemoScreen()
      }
    }
  }
}

@Composable
fun InsetDemoScreen() {
  val density = LocalDensity.current

  val statusBarTopPx: Int = WindowInsets.statusBars.getTop(density)

  val statusBarTopDp = (statusBarTopPx / density.density).dp

  Column(
    modifier = Modifier
      .fillMaxSize()
      .background(Color(0xFFF0F0F0))
      // Here we use the statusBarTopDp to offset the content
      // and avoid our fake close button colliding with the status bar.
      .padding(start = 20.dp, end = 20.dp, top = statusBarTopDp)
      .padding(bottom = 20.dp),
    verticalArrangement = Arrangement.Top,
    horizontalAlignment = Alignment.Start
  ) {
    // Our button is not actually doing anything. It's just a demonstration
    // of a use case where you might want to avoid the status bar area.
    IconButton(
      onClick = { /*…*/ },
      modifier = Modifier
        .size(48.dp)
        .background(Color.Black.copy(alpha = 0.5f), CircleShape)
    ) {
      Icon(Icons.Default.Close, contentDescription = "Close", tint = Color.White)
    }

    Spacer(Modifier.height(16.dp))

    Box(
      modifier = Modifier
        .fillMaxWidth()
        .background(Color.White, RoundedCornerShape(4.dp))
        .padding(16.dp)
    ) {
      Column {
        Text(
          "This is a native view that relies on insets",
          color = Color.Black,
          fontWeight = FontWeight.Bold
        )
        Spacer(Modifier.height(8.dp))
        Text(
          "statusBars().top: ${statusBarTopPx}px",
          color = Color.Black
        )
      }
    }
  }
}