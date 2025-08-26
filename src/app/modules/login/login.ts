import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    try {
      // Simulación de validación de usuario (reemplazar por API real)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const { email, password } = this.loginForm.value;

      console.log('Email:', email);
      console.log('Password:', password);

      // Simulación de validación de credenciales
      let role = this.determineUserRole(email, password);

      if (!role) {
        this.errorMessage = 'Credenciales incorrectas';
        this.isLoading = false;
        return;
      }

      // Guardar información del usuario (en un caso real, usar un servicio)
      localStorage.setItem('userRole', role);
      localStorage.setItem('userEmail', email);

      // Redirección según rol
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (role === 'cajero') {
        this.router.navigate(['/cajero']);
      }
    } catch (error) {
      this.errorMessage = 'Error al iniciar sesión. Intente nuevamente.';
      console.error('Error en login:', error);
    } finally {
      this.isLoading = false;
    }
  }

  private determineUserRole(email: string, password: string): string | null {
    // Simulación simple de usuarios (reemplazar por API real)
    const users = [
      { email: 'admin@farmapro.com', password: 'admin123', role: 'admin' },
      { email: 'cajero@farmapro.com', password: 'cajero123', role: 'cajero' },
      { email: 'test@test.com', password: '1234', role: 'cajero' },
    ];

    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    return user ? user.role : null;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required'])
        return `${this.getFieldLabel(fieldName)} es requerido`;
      if (field.errors['email']) return 'Ingrese un email válido';
      if (field.errors['minlength'])
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Email',
      password: 'Contraseña',
    };
    return labels[fieldName] || fieldName;
  }
}
